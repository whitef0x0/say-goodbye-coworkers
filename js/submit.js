$(".template-form").show();
$(".template-result").hide();  

var generateMailLink = function(email, cc_emails, subject, emailBody, type){
  
  var href = '';

  var html = emailBody;
  var dataURI = 'data:text/html,' + encodeURIComponent(html);
  
  if(type === "desktop"){
    href = "mailto:"+escape(email)
             + "?cc="+escape(cc_emails)
             + "&subject=" + escape(subject)
             + "&body=" + escape(dataURI);
    return href;
  }else if(type === "gmail"){
    href = "https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to="+escape(email)
             + "&su=" + escape(subject)
             + "&body=" + escape(dataURI);
    return href;
  }else if(type === "yahoo"){
    href = "http://compose.mail.yahoo.com/?to="+escape(email)
         + "&subj=" + escape(subject)
         + "&body=" + escape(dataURI);
    return href;
  }else if(type === "hotmail"){
    href = "https://mail.live.com/default.aspx?rru=compose&amp;to="+escape(email)
         + "&subject=" + escape(subject)
         + "&body=" + escape(dataURI);
    return href;
  }else {
    href = "http://mail.aol.com/mail/compose-message.aspx?to="+escape(email)
         + "&subject=" + escape(subject)
         + "&body=" + escape(dataURI);
    return href;
  }
}

var renderLetterTemplate = function(valueMap){
  
  var grown = "";
  if(valueMap['second_position'] !== "" && valueMap['third_position'] !== ""){
    grown = "It’s hard to believe that ${length} ago, I was the ${first_position}. From that time, until when I was ${second_position}, and all the way to my current role as ${third_position}, I have grown so much. Thank you for teaching and inspiring me, and allowing me to do the same for you."
  }else if(valueMap['second_position'] !== "" && valueMap['third_position'] == ""){
    grown = "It’s hard to believe that ${length} ago, I was the ${first_position}. From that time and all the way to my current role as ${third_position}, I have grown so much. Thank you for teaching and inspiring me, and allowing me to do the same for you."
  }else{
    grown = "It’s hard to believe that I joined over ${length} ago. Since then, I have grown so much as a ${first_position} and as a person. Thank you for teaching and inspiring me, and allowing me to do the same for you."
  }
  
  var contact="";
  if(valueMap['email']){
    contact = contact+"Email:${email}<br>"
  }
  if(valueMap['phone']){
    contact = contact+"Phone:${phone}<br>"
  }
  if(valueMap['twitter']){
    contact = contact+"Twitter:${twitter}<br>"
  }
  if(valueMap['linkedin']){
    contact = contact+"LinkedIn:${linkedin}<br>"
  }
  
  var htmlMarkup = "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>Fellow ${nickname},</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>It’s with ${sadness} that I must share with you my decision to leave  ${company_name}. This was ${difficulty} a very difficult decision to make.</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>"+grown+"</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>I am headed off to explore my next chapter ${next_steps}</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>I’m excited about my future there while I continue to be excited about all the things you’ll continue to accomplish here (except for you ${fun_of_person}), ${fun_of_reason}</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>If I could leave you all with just one thought, remember <br><br> ${advice} </p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>If you ever want to get in touch, my contact info is below. This isn’t goodbye, our paths will cross again. Hopefully at farewell happy hour drinks at 5!</span></p>"+
              "<br><p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>-${name}</span></p>"+
              "<br><p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>"+contact+"</span></p>";
  
  $(".template-form").hide();
  $(".template-result").show();
  var renderedTemplate =$.tmpl(htmlMarkup, valueMap);
  renderedTemplate.appendTo("#letterContent");
  return renderedTemplate;
}

$('#resultForm').submit(function(event){
  event.preventDefault();
});

var getFormValues = function(formCSS_Selector){
  var values = {};
  $.each($(formCSS_Selector).serializeArray(), function(i, field) {
    values[field.name] = field.value;
  }); 
  
  return values;
}

//Handle form submission
$('#templateForm').submit(function(event)
  {
    event.preventDefault();
    
    var values = getFormValues('#templateForm');
    var bodyData = renderLetterTemplate(values);
    console.log(bodyData);
    console.log(values);
    
    $('#resultForm').submit(function(event){
      event.preventDefault();
      var mailValues = getFormValues('#resultForm');
      console.log(mailValues);
      
      var mailLink = generateMailLink(mailValues['primary_email'], mailValues['cc_emails'], mailValues['subject'], '', 'desktop');
      var win = window.open(mailLink, '_blank');
      if(win){
          
          $(".template-form").show();
          $(".template-result").hide(); 
          
          //Reset forms
          $("#templateForm")[0].reset();
          $("#resultForm")[0].reset();
          
          //Browser has allowed it to be opened
          //win.focus();
          
          //var bodyElem = win.document.querySelector('.Am.Al.editable.LW-avf');
          
          //bodyElem.append(bodyData);
      }else{
          //Broswer has blocked it
          alert('Please allow popups for this site');
          $("#resultForm")[0].reset();
      }

      
    });
    
});

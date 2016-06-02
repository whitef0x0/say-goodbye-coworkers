  $(".template-form").show();
  $(".template-result").hide();  

var renderLetterTemplate = function(valueMap){
  var markup = "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>Fellow ${nickname},</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>It’s with ${sadness} that I must share with you my decision to leave  ${company_name}. This was ${difficulty} a very difficult decision to make.</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>It’s hard to believe that ${length} ago, I was the ${first_position}. From that time, until when I was ${second_position}, and all the way to my current role as ${third_position}, I have grown so much. Thank you for teaching and inspiring me, and allowing me to do the same for you. </span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>I am headed off to explore my next chapter ${next_steps}</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>I’m excited about my future there while I continue to be excited about all the things you’ll continue to accomplish here (except for you ${fun_of_person}), ${fun_of_reason}</span></p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>If I could leave you all with just one thought, remember <br><br> ${advice} </p>"+
              "<p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>If you ever want to get in touch, my contact info is below. This isn’t goodbye, our paths will cross again. Hopefully at farewell happy hour drinks at 5!</span></p>"+
              "<br><p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>-${name}</span></p>"+
              "<br><p><span style='color: #000000; font-family: arial, helvetica, sans-serif;'>Email:${email}<br>Phone:${phone}<br>Twitter:${twitter}<br>LinkedIn:${linkedin}</span></p>";
  
  $(".template-form").hide();
  $(".template-result").show();        
  $.tmpl(markup, valueMap).appendTo("#letterContent");
  console.log($.tmpl(markup, valueMap));
}

//Handle form submission
$('form').submit(function(event)
  {
    event.preventDefault();
    
    var values = {};
    $.each($('#templateForm').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    }); 
    
    console.log(values);
    renderLetterTemplate(values);
});

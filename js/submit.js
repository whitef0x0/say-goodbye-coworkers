//Handle form submission
$('form').submit(function(event)
  {
    event.preventDefault();
    
    var values = {};
    $.each($('#templateForm').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    }); 
    
    console.log(values);
});

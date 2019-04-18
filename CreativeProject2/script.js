document.getElementById("currencySubmit").addEventListener("click", function(event)
{
    event.preventDefault();
    const value = document.getElementById("currencyInput").value;
    if (value === "")
        return;
    console.log(value);
  });

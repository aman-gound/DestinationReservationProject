const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); 


  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()); 

  console.log("Data to send:", data);

  try {
    
    const response = await fetch("http://localhost:3000/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok) {
      alert(result.message);
      form.reset();

     
      window.location.href = "thankyou.html";
    } else {
      alert(result.error || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error!");
  }
});


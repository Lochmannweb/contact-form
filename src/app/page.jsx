import React, { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message senr successfully!");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
      });
    } else {
      alert("Failed to send message");
    }
  };

  return (
    <>
    <form 
      action="" 
      onSubmit={handleSubmit}
      className='' >

        <h2>Let's Work Together</h2>

{/* fulde navn */}
        <div>
          <label>Full name</label>
          <input 
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className='' />
        </div>

{/* Nummer */}
        <div>
          <label>Phone number</label>
          <input 
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className='' />
        </div>

{/* Email */}
        <div>
          <label>Email</label>
          <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className='' />
        </div>

{/* Message */}
        <div>
          <label>Message</label>
          <input 
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className='' />
        </div>

        <button
        type="submit"
        className=''>
          Send
        </button>
      
    </form>
    </>
  )
}


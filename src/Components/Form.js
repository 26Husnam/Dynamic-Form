import React, { useState } from 'react';

const ContactForm = () => {
  const [formList, setFormList] = useState([
    { id: 1, name: '', phone: '', email: '', description: '' },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setFormList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Form submitted with data:', formList);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const addForm = () => {
    setFormList((prevList) => [
      ...prevList,
      { id: prevList.length + 2, name: '', phone: '', email: '', description: '' },
    ]);
  };

  const removeForm = (id) => {
    setFormList((prevList) => prevList.filter((item) => item.id !== id));
  };
  

  return (
    <>
      {formList.map((formData) => (
        <form key={formData.id} >
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(formData.id, e)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange(formData.id, e)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(formData.id, e)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(formData.id, e)}
              required
            />
          </div>


        {formList.length > 1 && (

          <button type="button" onClick={() => removeForm(formData.id)}>
            Remove
          </button>
        )}

        </form>
      ))}

          <button type="submit" disabled={loading} onSubmit={handleSubmit}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

      <button type="button" onClick={addForm}>
        Add Form
      </button>
    </>
  );
};

export default ContactForm;
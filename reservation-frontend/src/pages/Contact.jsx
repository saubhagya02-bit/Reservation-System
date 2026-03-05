import React, { useState } from 'react';

export default function Contact() {

    const [success, setSuccess] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            setSuccess("Message sent successfully!");
        };
    
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-6'>
        <div className='max-w-3xl mx-auto bg-white p-10 rounded shadow'>

            <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                Contact Us
            </h1>

            {success && (
                <div className='bg-green-100 text-green-700 p-3 rounded mb-4 text-center'>
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-5'>

                <div>
                    <label className='block text-gray-700 mb-1'>Name</label>
                    <input 
                        type='text'
                        required
                        placeholder='Enter your email'
                        className='w-full border p-2 rounded focus:ring-2 focus:ring-blue-400'
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Message</label>
                    <textarea
                        rows="4"
                        required
                        placeholder="Write your message"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
                >
                    Send Message
                </button>
            </form>
        </div>
    </div>
  );
}

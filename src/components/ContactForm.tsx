import Script from 'next/script';

const ContactForm = () => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" />
      <Script src="./email.js" />
      <Script src="./send.js" />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="messageSuccess text-xl text-gray-800 tracking-wider hidden">
          <h2 className="text-center font-semibold">
            Thank you for submitting your proposal! We will be in touch soon.
          </h2>
        </div>
        <form id="contact-form" className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Work inquiries</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input type="text" name="company" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
              <input type="tel" name="phone" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" required minLength={12} className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-300"></textarea>
            </div>
          </div>
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-base font-medium text-gray-700">Budget</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {["$5K – $10K", "$10K – $25K", "$25K – $100K", "More than $100K"].map((label, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="radio" name="budget" value={label} className="form-radio text-indigo-600" />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="text-gray-600 text-sm">
            Note: For certain proposals we will also consider taking equity as a portion of compensation.
          </p>
          <button type="submit"
  
  className="inline-block px-8 py-3 text-black font-mono text-lg tracking-wider uppercase bg-[#0ff] rounded-md transition duration-300 hover:bg-[#0cc] shadow-[4px_4px_0_#f0f,8px_8px_0_#00f] hover:shadow-[2px_2px_0_#f0f,4px_4px_0_#00f]"
>
 Let&apos;s work together
</button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;

import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import Button from "./Button";
import Script from 'next/script';

const ContactForm = () => {
  return (
    <>
    <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" />
    <Script src="./email.js"/>
    <Script src="./send.js"/>
    <div>
      <div className="messageSuccess text-1xl text-slate-800 tracking-wider hidden">
        <h2>Thank you for submitting your proposal! We will be in touch soon.</h2>
      </div>
      <form id="contact-form">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput label="Phone (Optional)" type="tel" name="phone" autoComplete="tel" required={false}/>
          <TextInput label="Message" name="message" required={true}
              inputProps={{ minLength: 12 }}
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RadioInput label="$5K – $10K" name="budget" value="25" />
              <RadioInput label="$10K – $25K" name="budget" value="50" />
              <RadioInput label="$25K – $100K" name="budget" value="100" />
              <RadioInput label="More than $100K" name="budget" value="150" />
            </div>
          </div>
        </div>
        <p className="mt-6 text-neutral-600">Note: For certain proposals we will also consider taking equity as a portion of compensation.</p>
        <input type="submit" value="Send"/>
        <Button type="submit" className="mt-4 border-b-4 border-red-700">
          Let’s work together
        </Button>
      </form>
    </div>
    </>
  );
};

export default ContactForm;

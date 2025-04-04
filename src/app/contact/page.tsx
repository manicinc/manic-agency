"use client"
import ContactDetails from "@/components/ContactDetails";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import { Nav } from "@/components/Nav";

const ContactPage = () => {
  return (
    <>
      <div className='bg-[#23153c] text-white py-6'>
        <Nav />
        <div className='text-center mt-10'>
          <h1 className='text-4xl font-bold'>Let&apos;s work together</h1>
          <p className='mt-2 text-lg'>We can&apos;t wait to build something with you.</p>
        </div>
      </div>
      <Container className="mt-24 sm:mt-32 lg:mt-40 mb-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactDetails />
          <ContactForm />
        </div>
      </Container>
    </>
  );
};

export default ContactPage;

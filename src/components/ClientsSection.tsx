export default function ClientsSection() {
    const clients = [
      "Edelman",
      "Hereafterlegacy.ai",
      "Grapple Media",
      "NuBloom NFTs",
      "Smurf Finance",
    ];
  
    return (
      <section className="py-16 text-white text-center relative">
        <p className="text-gray-400 mb-8">We have had the pleasure of working with these great companies:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {clients.map((client, index) => (
            <div key={index} className="bg-[#7a1e411e] p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-semibold">{client}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
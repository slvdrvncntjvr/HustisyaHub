import { MessageSquare, FolderOpen, Mail, FileText, Scale, Building, ArrowRight } from 'lucide-react';

export function GuidesLibrary() {
  const guides = [
    {
      icon: MessageSquare,
      title: 'How to File a Complaint',
      description: 'Step-by-step guide for filing formal complaints with government agencies.',
      category: 'Filing',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: FolderOpen,
      title: 'How to Request Records',
      description: 'Learn the process for requesting public records and documents.',
      category: 'Records',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Mail,
      title: 'How to Send a Formal Letter',
      description: 'Proper format and etiquette for official correspondence.',
      category: 'Communication',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: FileText,
      title: 'Freedom of Information (FOI)',
      description: 'Understanding your rights and how to submit FOI requests.',
      category: 'Rights',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Scale,
      title: 'Legal Assistance Requests',
      description: 'How to request legal aid and support from government services.',
      category: 'Legal',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: Building,
      title: 'Business Permits & Licenses',
      description: 'Navigate the requirements for business registration and permits.',
      category: 'Business',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Guides Library</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of informative guides for various government processes
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${guide.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <guide.icon className="w-6 h-6" />
                </div>
                <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {guide.category}
                </span>
              </div>

              <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>

              <div className="flex items-center text-blue-600 group-hover:gap-2 transition-all">
                <span>Read guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
            View All Guides
          </button>
        </div>
      </div>
    </section>
  );
}

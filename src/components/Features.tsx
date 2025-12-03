import { FileText, Building2, Sparkles, ListChecks } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: FileText,
      title: 'Organized Report Templates',
      description: 'Access professionally designed templates for various government reports and formal letters.',
      color: 'bg-blue-600',
    },
    {
      icon: Building2,
      title: 'Department-Specific Filing Requirements',
      description: 'Get detailed information on requirements for each government department and agency.',
      color: 'bg-indigo-600',
    },
    {
      icon: Sparkles,
      title: 'AI-Assisted Guidance',
      description: 'Receive intelligent suggestions and corrections to ensure your reports meet all standards.',
      color: 'bg-purple-600',
    },
    {
      icon: ListChecks,
      title: 'Easy-to-Follow Process Breakdown',
      description: 'Navigate complex filing procedures with clear, step-by-step instructions and checklists.',
      color: 'bg-green-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Features That Simplify Filing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional reports and navigate government processes with confidence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

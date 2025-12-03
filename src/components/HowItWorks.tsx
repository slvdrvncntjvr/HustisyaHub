import { FileSearch, Edit3, Download } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: FileSearch,
      title: 'Choose Report Type',
      description: 'Select from various government report templates tailored to your specific needs.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Edit3,
      title: 'Provide Details',
      description: 'Fill in your information with guided fields and helpful prompts.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Download,
      title: 'Generate Formal Output',
      description: 'Download your properly formatted report or view department-specific filing instructions.',
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your formal reports ready in just three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 -z-10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
              )}

              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`${step.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="text-gray-300 text-5xl">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

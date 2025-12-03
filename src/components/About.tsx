import { Target, Heart, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Accessible',
      description: 'Making government processes easy to understand for everyone',
    },
    {
      icon: Heart,
      title: 'User-Friendly',
      description: 'Simplified workflows that save you time and effort',
    },
    {
      icon: Shield,
      title: 'Transparent',
      description: 'Clear guidance on every step of the filing process',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613759612065-d5971d32ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0NjUxMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-gray-900">Our Mission</h2>
              <p className="text-gray-600">
                We're dedicated to making government reporting easier, more accessible, and more transparent for all Filipinos. 
                Whether you're filing your first formal complaint or need guidance on complex administrative procedures, 
                we're here to help you navigate every step with confidence.
              </p>
              <p className="text-gray-600">
                Our platform combines expert knowledge of Philippine government processes with modern technology to provide 
                you with accurate templates, clear instructions, and intelligent assistance—all in one place.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

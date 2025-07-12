import { Check, X } from 'lucide-react';

const ProblemSolutionSection = () => {
  const problems = [
    "Slow organic growth taking months to see results",
    "Expensive marketing campaigns with poor ROI",
    "Fake followers that don't engage with content",
    "Complex growth strategies that require expertise"
  ];

  const solutions = [
    "Instant results within 24-48 hours",
    "Affordable packages starting from $2.99",
    "100% real and active followers",
    "Simple 3-step process anyone can follow"
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stuck with Your Social Media Growth?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stop struggling with slow growth and ineffective strategies.
            Likes.IO provides the fastest, most reliable way to boost your social media presence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problems */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center">
              <X className="h-6 w-6 mr-2" />
              Common Problems
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center">
              <Check className="h-6 w-6 mr-2" />
              Likes.IO Solutions
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white mb-6">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your Social Media Today
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of creators, businesses, and influencers who have already
            supercharged their growth with Likes.IO's proven system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;

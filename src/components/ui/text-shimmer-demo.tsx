
import { TextShimmer } from '@/components/ui/text-shimmer';

export function TextShimmerColor() {
  return (
    <TextShimmer
      duration={1.2}
      className='text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]'
    >
      Hi, how are you?
    </TextShimmer>
  );
}

export function TextShimmerDemo() {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold mb-4">Text Shimmer Effect</h2>
      <TextShimmerColor />
      <TextShimmer 
        as="h3" 
        className="text-2xl font-bold [--base-color:theme(colors.rose.700)] [--base-gradient-color:theme(colors.rose.300)]"
      >
        Customizable shimmer effects
      </TextShimmer>
      <TextShimmer 
        duration={3}
        className="text-lg [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.300)]"
      >
        Control the speed and spread of the effect
      </TextShimmer>
    </div>
  );
}

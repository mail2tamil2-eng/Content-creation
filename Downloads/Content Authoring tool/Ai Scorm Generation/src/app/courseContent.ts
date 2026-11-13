export interface SlideOption { text: string; correct: boolean; remark: string; showRemark?: boolean }
export interface SlideQuestion { id: string; type: 'MCQ' | 'True/False'; text: string; options: SlideOption[]; points: number }
export interface CourseTopic {
  id: string;
  title: string;
  slideType?: string;
  content?: string;
  bullets?: string[];
  presenter?: string;
  script?: string;
  questions?: SlideQuestion[];
  element?: string;
  audioScript?: string;
  videoGenerated?: boolean;
  imageUploaded?: boolean;
  videoUploaded?: boolean;
  audioGenerated?: boolean;
  contentReady?: boolean;
  [key: string]: unknown;
}
export function generateSlideContent(topic: CourseTopic, courseTitle: string, questionCount = 1): CourseTopic {
  if (topic.contentReady) return topic;
  const content = `In ${courseTitle}, ${topic.title.toLowerCase()} helps you connect the main ideas with practical decisions. Identify the key concept, consider a realistic example, and explain how you would apply it in your work.`;
  const bullets = [`Identify the key ideas behind ${topic.title.toLowerCase()}.`, 'Connect each idea to a practical example.', 'Apply what you have learned and reflect on the result.'];
  const result: CourseTopic = { id: topic.id, title: topic.title, slideType: topic.slideType, contentReady: true, content };
  if (topic.slideType === 'title-bullets' || topic.slideType === 'summary') result.bullets = bullets;
  if (topic.slideType === 'spokesperson') { result.presenter = 'Maya'; result.script = `Welcome to ${topic.title}. ${content}`; }
  if (topic.slideType === 'audio') result.audioScript = content;
  Object.assign(result, sampleMedia(topic.slideType, topic.id, topic.title));
  if (topic.slideType === 'scenario') { result.element = 'sequencing'; result.bullets = bullets; }
  if (topic.slideType === 'quiz' || topic.slideType === 'knowledge-check') {
    result.questions = Array.from({ length: Math.max(1, Math.min(50, questionCount)) }, (_, i) => ({
      id: topic.id + '-q-' + i, type: 'MCQ', points: 1,
      text: `Practice ${i + 1}: Which action best applies ${topic.title.toLowerCase()}?`,
      options: [
        { text: 'Apply the concept to a relevant situation and review the outcome.', correct: true, remark: 'Correct. Practice and reflection help you apply your learning.' },
        { text: 'Ignore the context and repeat the same action.', correct: false, remark: 'Consider the context before choosing an action.' },
        { text: 'Skip the activity without checking your understanding.', correct: false, remark: 'Try applying the concept to check your understanding.' },
      ],
    }));
  }
  return result;
}

/**
 * Starter items for media slides so a new slide shows its layout (sample photos are
 * shown until the author uploads images — see components/slidePhotos.ts).
 */
export function sampleMedia(slideType: string | undefined, id: string, title: string): Partial<CourseTopic> {
  if (slideType === 'image-horizontal' || slideType === 'media-collection') {
    return {
      imageCards: ['Set the direction', 'Bring people with you', 'Review and adjust'].map((heading, i) => ({
        id: `${id}-img-${i}`, heading, description: `A practical example of ${title.toLowerCase()}.`, image: '', alt: '',
      })),
    };
  }
  if (slideType === 'horizontal-series' || slideType === 'vertical-series') {
    return {
      seriesItems: [['Prepare', 'Agree the goal and what good looks like.'], ['Act', 'Try the approach with your team.'], ['Review', 'Check the result and adjust.']]
        .map(([label, description], i) => ({ id: `${id}-s-${i}`, label, description })),
    };
  }
  if (slideType === 'image-vertical') {
    return { content: `Use this space to explain ${title.toLowerCase()}. Pair the picture with one clear idea and a short example.`, imagePosition: 'left', imageUrl: '', alt: '' };
  }
  if (slideType === 'hotspot') {
    return { hotspots: ['Start here', 'Key detail', 'Next step'].map((t, i) => ({ id: `${id}-hs-${i}`, title: t, content: `What learners should notice about ${t.toLowerCase()}.` })) };
  }
  return {};
}

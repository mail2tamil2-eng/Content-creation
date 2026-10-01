Content Authoring Tool Using AI 
1. Objective 
Design and implement an AI-powered system that enables users to create structured eLearning courses end-to-end—from course metadata to SCORM package—using guided steps, templates, and automated content generation. 
2. Scope 
In Scope 
•	AI-assisted course creation (objectives, outcomes, content)  
•	Template-based content structuring  
•	Multi-format slide generation (audio, quiz, hotspot, etc.)  
•	Storyboard generation  
•	SCORM export (1.2 / 2004) 
 
3. Functional Requirements 
Step 1: Course Details 
The system shall provide a course setup screen containing the following fields: 

Field 	Requirement 
Course Title 	Text input 
Skill Level 	Beginner / Intermediate / Expert 
Duration 	Numeric value + unit 
Industry 	Technology / Education / Custom 
Target Audience 	Text input 
Language 	Supported language selection 
Course Objective 	Manual input or AI generation 
Course Outcomes 	Manual input or AI generation 
Add Quiz 	Enable - Numeric input 
Add Knowledge Check per topic 	Enable - Numeric input 

Template Selection 

•	Predefined templates - These are ready-made templates provided by the LMS/product. The author selects one based on the type of course they want to create.
Examples?
•	Custom templates (organization-specific) - A custom template is created by the organization according to its own branding.

Option	Configuration
Organization Logo	Upload logo
Favicon	Upload favicon, if applicable
Primary Color	Brand primary color
Secondary Color	Brand secondary color
Accent Color	Button/highlight color
Background Color	Slide background
Text Color	Default text color
Font Family	Select organization-approved font
Header	Enable/disable and configure
Footer	Enable/disable and configure
Copyright Text	Configure copyright statement
Watermark	Enable/disable and configure

•	Blank template - Blank Template means there is no predefined course structure. The author starts with an empty course.

Theme Selection
The author shall be able to select or modify the visual theme where permitted by the template.
Theme configuration may include:
•	Primary color 
•	Secondary color 
•	Font 
•	Background 
•	Button style 
•	Player style 
•	Slide layout
Features 
•	Template preview before selection  
•	Apply template structure to course  
 
Step 2: Course Outline Generation 

With the given input AI should generate a content structure in the below given format. 
 
Standard Structure 
Level 	Component 	AI Responsibility 
Course 	Course Introduction 	Generate introduction based on course objective and audience 
Section 	Section Introduction 	Generate section context and objective 
Topic 	Learning Content 	Generate topic-specific content 
Topic 	Learning Activity 	Recommend suitable interaction where applicable 
Topic 	Knowledge Reinforcement 	Generate examples, scenarios or interactive elements where appropriate 
Section 	Summary / Recap 	Generate key takeaways 
Section 	Knowledge Check 	Generate configured number of questions 
Course 	Final Assessment 	Generate configured number of assessment questions 
Course 	Completion	Apply configured completion criteria 
 



By default, minimum of 3 section and quiz should contain 10 question, and knowledge check should contain 5 questions.  

Per Section Controls 
•	Edit Section Topic 
•	Regenerate outline  
•	Delete section  
•	Duplicate
•	Add Section - Generate with AI by prompt 
•	Reorder  
•	Regenerate complete section 
•	Delete 

Slide Design 

The AI should recommend the most suitable slide type rather than requiring the author to manually select every slide. 

Supported Slide Types:

Slide Type	Purpose
Title + Text	Present explanations or descriptive content
Title + Bullet Points	Present key points concisely
Spokesperson	Present content using an AI/virtual presenter
Image / Visual	Explain or reinforce concepts visually
Video	Present demonstrations, scenarios, explanations, or other audiovisual learning content
Scenario / Decision	Present a situation requiring learner decision-making
Quiz	Present assessment questions
Summary	Present key learning points and takeaways

The AI shall recommend a slide type based on:
•	Learning objective 
•	Content type 
•	Topic complexity 
•	Target audience 
•	Course structure 
•	Learning activity 
•	Knowledge reinforcement requirement 
•	Assessment requirement 
•	Selected template/theme
Author actions 
•	Accept AI recommendation  
•	Change slide type  
•	Add slide with AI Prompt
•	Delete slide  
•	Reorder slide
•	Duplicate slide  
•	Regenerate individual slide structure 
•	Regenerate complete topic slide structure 
•	Regenerate complete section structure 

Course Content 

AI generates the one or more of the following content types:
Each slide may contain: 
•	Concept / Explanation
•	Definition
•	Key Points
•	Example
•	Process / Procedure
•	Scenario
•	Case Study
•	Comparison
•	Best Practice
•	Tips / Guidelines
•	Demonstration
•	Knowledge Reinforcement
•	Summary / Recap
•	Assessment
•	Final Assessment

Media Management
Image Management
For image-based content, the author shall be able to:
•	Upload image 
•	Generate image using AI 
•	Select image from asset library 
•	Replace image 
•	Preview image 
•	Crop/resize image 
•	Reposition image 
•	Regenerate AI image 
•	Delete image 
 Video Management
For video content, the author shall be able to:
•	Upload video 
•	Generate video using AI, where supported 
•	Select video from asset library 
•	Replace video 
•	Preview video 
•	Play/Pause video 
•	Trim video 
•	Configure video playback 
•	Add caption/subtitle 
•	Configure poster/thumbnail 
•	Regenerate AI video 
•	Delete video 
Audio / Narration Management
For audio content, the author shall be able to:
•	Upload audio 
•	Generate AI narration 
•	Select voice 
•	Configure language 
•	Configure voice style/tone 
•	Preview/play audio 
•	Pause/stop audio 
•	Regenerate narration 
•	Replace audio
•	Delete audio
AI Spokesperson Management
For spokesperson slides, the author shall be able to:
•	Select AI presenter 
•	Select presenter appearance 
•	Select voice 
•	Select language 
•	Enter/edit presenter script 
•	Generate presenter video 
•	Preview video 
•	Regenerate video 
•	Replace presenter 
•	Replace voice 
•	Delete presenter content 

Interactive Elements
An Interactive Element defines how the learner interacts with the content presented on the slide.AI shall recommend an interactive element where it provides meaningful learning or assessment value.
Supported Interactive Elements: (Cross Verify H5P)
•	Hotspot
•	Click-to-Reveal
•	Slider
•	Drag & Drop
•	Matching
•	Sequencing
•	Branching Scenario
•	MCQ
•	True / False
•	Flash Card

Quiz & Assessment Management
The AI shall be capable of generating assessment questions based on the learning objectives and slide/course content.
Quiz Author Actions
The author shall be able to:
•	Generate questions using AI 
•	Add question 
•	Edit question 
•	Delete question 
•	Duplicate question 
•	Reorder questions 
•	Edit answer options 
•	Add/remove answer options 
•	Set correct answer 
•	Configure points/marks 
•	Configure passing score 
•	Add feedback 
•	Edit feedback 
•	Regenerate individual question 
•	Regenerate complete quiz 
•	Preview quiz 
•	Save quiz 
AI Question Generation
The AI shall consider:
•	Learning objective 
•	Course/topic content 
•	Difficulty level 
•	Target audience 
•	Assessment requirement 
•	Knowledge reinforcement requirement 
The author should also be able to provide custom instructions 
AI capabilities 
•	Context-aware content generation  
•	Tone adaptation  
•	Audience adaptation  
•	Content variation  
•	AI asset generation/recommendation  
•	AI narration generation  
•	AI question generation  

Author actions 
•	Edit content  
•	Regenerate content  
•	Regenerate narration  
•	Replace assets  
•	Edit questions  
•	Add/delete content  
•	Provide custom AI instructions  
 
 
Step 3 – Global Settings

Navigation 
•	Linear  
•	Free (Default) 
Bookmarking 
•	Enable (Default) 
•	Disable  
Seek bar 
•	Enable / Disable  
•	Allow Drag (Default) 
•	Restricted seeking  
•	Drag After Completion 
Audio   
•	Slide audio (AI Generated) - Enable (Default) / Disable –
Instead of:
Slide audio – Enable/Disable
use:
Slide Audio
Source:
•	None 
•	AI-generated narration 
•	Uploaded audio 
Behavior when audio already exists:
•	Keep existing audio 
•	Replace existing audio 
•	Generate additional narration 
•	Do not generate 
This avoids ambiguity.
For example, if a slide already contains an uploaded audio file and AI-generated narration = Enable, the system needs to know whether to overwrite the existing audio.
•	Background music (AI Generated) - Enable (Default) / Disable 
•	Volume Control – Show (Default) / Hide 
•	Voice – AI Selected Voice default, if required the course creator can change it. 
Accessibility 
•	Captions - Enable (Default) / Disable 
•	Transcript - Enable (Default) / Disable 
•	Alt text - Manual / AI-generated (Default) 
•	Keyboard navigation - Enable (Default)
Visual 
•	Slide transition - None / Fade / Slide / Template (Default ) + Other supported transitions. 
•	Animation - Enable / Disable (Template Default) 
•	Player Theme - Selected Template 
•	Full Screen - Enable (Default) / Disable 


Completion Criteria: 
Quiz Percentage Completion / Slide View Percentage / Knowledge Check Completion - Default No completion criteria tracked – course creator can map the completion criteria. 

Completion Criteria Source
•	No completion criteria 
•	Quiz 
•	Final Assessment 
•	Knowledge Check 
•	Slide View 
•	Course Completion 
Configuration
For example:
•	Quiz score ≥ 80% 
•	Final assessment score ≥ 70% 
•	100% slide viewing 
•	All knowledge checks completed 
This is clearer than:
Quiz Percentage Completion / Slide View Percentage / Knowledge Check Completion


Step 4 – Review & Preview 
The author can experience the course as a learner. 
Preview includes: 
•	Navigation  
•	Audio  
•	Interactions  
•	Knowledge checks  
•	Final assessment  
•	Transitions  
•	Seekbar  
•	Bookmarking/resume  
•	Captions/transcript  
•	Completion behavior  
Author actions 
•	Edit  
      Return to previous step 


SCORM Generation & Publish

After verifying the player elements, the author can either Save as Draft or Publish. When Save as Draft is selected, the SCORM package will be saved as a draft and will not be published. Once Publish is selected, the final SCORM package will be generated and made available for download.

Additionally, a provision should be available to push the SCORM to LMS
 

After the master SCORM course is generated(Draft/Publish), the author should have an option to generate the same course in one or more additional languages.

Option:
Target Language(s) - Select one or multiple supported languages
Translation Scope:
•	Translate course content into the selected language(s). 
•	Preserve the existing course structure, slide design, interactions, assessments, and settings. 
•	Translate learner-facing text, including quiz questions, knowledge checks, captions, and transcripts. 
•	Generate AI narration in the selected language. 
Author Actions:
•	Preview translated course 
•	Edit translated content 
•	Regenerate translation 
•	Review and approve translation 
•	Generate SCORM for the selected language(s) 
A separate SCORM package shall be generated for each selected language.







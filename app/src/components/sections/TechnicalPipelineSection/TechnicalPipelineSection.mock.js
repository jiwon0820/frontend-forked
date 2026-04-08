export const pipelineSteps = [
    {
        number: '01',
        tag: 'FastAPI',
        tagColor: '#0D93F2',
        name: 'Video Ingestion',
        description: 'multipart/form-data upload via POST /jobs. Async job created with UUID, status set to queued.',
    },
    {
        number: '02',
        tag: 'OpenCV',
        tagColor: '#22C55E',
        name: 'Frame Extraction',
        description: 'VideoCapture decodes frames. FPS-based sampling with per-frame timestamp and frameIndex tracking.',
    },
    {
        number: '03',
        tag: 'MediaPipe',
        tagColor: '#00F2FF',
        name: 'Pose Inference',
        description: 'BlazePose Landmarker in VIDEO mode. 33 landmarks extracted per frame with visibility scores.',
    },
    {
        number: '04',
        tag: 'Python',
        tagColor: '#F59E0B',
        name: 'Skeleton Mapping',
        description: 'Landmarks normalized to runtime schema. Hip-center anchored, coordinate system unified.',
    },
    {
        number: '05',
        tag: 'NumPy',
        tagColor: '#F97316',
        name: 'Kinematic Analysis',
        description: 'Joint angles, velocity, rep segmentation, symmetry index, and issue detection computed.',
    },
    {
        number: '06',
        tag: 'LLM',
        tagColor: '#A855F7',
        name: 'Feedback Generation',
        description: 'Structured analysis piped to LLM. Coaching cues, highlights, and corrections generated.',
    },
];

export const architectureLayers = [
    { index: '1', name: 'Entry Layer',   files: 'main.py',       description: 'uvicorn server startup' },
    { index: '2', name: 'App Layer',     files: 'app.py',        description: 'FastAPI app & router registration' },
    { index: '3', name: 'API Layer',     files: 'controller/',   description: 'HTTP endpoints' },
    { index: '4', name: 'Service Layer', files: 'service/',      description: 'Domain logic & pipeline orchestration' },
    { index: '5', name: 'Adapter Layer', files: 'adapter/',      description: 'OpenCV & MediaPipe bindings' },
    { index: '6', name: 'Schema Layer',  files: 'schema/',       description: 'Request & response contracts' },
];

export const jobStatusStages = [
    { status: 'queued',               ratio: '0%',   isTerminal: false },
    { status: 'extracting',           ratio: '25%',  isTerminal: false },
    { status: 'analyzing',            ratio: '75%',  isTerminal: false },
    { status: 'generating_feedback',  ratio: '90%',  isTerminal: false },
    { status: 'completed',            ratio: '100%', isTerminal: true  },
];

export const apiEndpoints = [
    { method: 'POST', path: '/jobs',                description: 'Upload video, create job' },
    { method: 'GET',  path: '/jobs/{jobId}',        description: 'Poll status & progress' },
    { method: 'GET',  path: '/jobs/{jobId}/result', description: 'Fetch full analysis result' },
];

export const hypotheses = [
    'Securing skeleton extraction accuracy from single-view video',
    'Verifying the validity of LLM-based biomechanics feedback',
    'Precise synchronization of data visualization with source video',
];

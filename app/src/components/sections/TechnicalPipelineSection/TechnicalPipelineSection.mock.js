// TODO: 목업 데이터 — 실제 콘텐츠로 교체 필요

export const hypotheses = [
    'Securing skeleton extraction accuracy from single-view video',
    'Verifying the validity of LLM-based biomechanics feedback',
    'Precise synchronization of data visualization with source video',
];

export const pipelineSteps = [
    {
        number: '01',
        name: 'Data Ingestion',
        description: 'Video uploaded & Split into frames by FFmpeg',
    },
    {
        number: '02',
        name: 'Skeleton Extraction',
        description: 'MediaPipe BlazePose 3D coordinates extraction',
    },
    {
        number: '03',
        name: 'Kinematic Engine',
        description: 'Physics-based movement analysis & Angle calculation',
    },
    {
        number: '04',
        name: 'AI Feedback',
        description: 'LLM interpretation of numerical data patterns',
    },
];

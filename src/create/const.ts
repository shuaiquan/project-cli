export const TEMPLATE_REPO = 'https://github.com/shuaiquan/template.git';

export enum TemplateType {
    ES,
    // TS,
    TSReact,
}

export const BranchMap = {
    [TemplateType.ES]: 'project/es',
    [TemplateType.TSReact]: 'project/ts',
}
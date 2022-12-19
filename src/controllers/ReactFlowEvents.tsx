
import { NodeData, NodeParameter } from '../types/CanvasTypes';

export const generateFormDataFromParams = (paramsData: any, nodeId: string): NodeParameter[] => {

    const formData : NodeParameter[] = [];
    console.log(paramsData);
    for (let i = 0; i < paramsData.length; i++) {
        const parameter = paramsData[i];
        const formId = Math.random().toString(36).substring(2, 9);
        formData.push({
            id: formId,
            nodeId: nodeId,
            name: parameter.name,
            type: parameter.type,
            paramType: parameter.paramType ? parameter.paramType : null,
            value: null,
            required: true // parameter.required,
        });
    }

    return formData;
}

export const createNodeObject = (id: string, name: string, type: string, position: any, data: NodeData) => {

    const newNode = {
        id: id,
        name,
        type: 'selectorNode',
        position,
        active: true,
        data: data,
    };

    return newNode;
}
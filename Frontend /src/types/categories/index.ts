export interface Category {
    id: string;
    name: string;
    parentId: string | null;
    depth:number,
    children?: Category[];
}

export interface UpdateCategoryData {
    id: string;
    updateData: {
        name?: string;
        parentId?: string | null;
    };
}
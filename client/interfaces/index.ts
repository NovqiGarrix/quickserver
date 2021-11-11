import { ComponentProps } from "react"


export type ProjectType = {
    active: boolean;
    type: string;
    name: string;
    createdAt: string;
}

export type AppType = {
    name: string;
    createdAt: string;
    Icon: any;
    type: string;
}
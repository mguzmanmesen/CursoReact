import React, { ReactNode } from "react";
import { StringMappingType } from "typescript";

export interface IAlert extends React.PropsWithChildren
{
    message: string;
    type: string;
    show: boolean;
}
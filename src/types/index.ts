import { CSSProperties, ReactNode } from 'react'

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Voidable<T> = T | null | undefined;

export type RenderElement = ReactNode

export interface CommonComponentProps {
    className?: string
    style?: CSSProperties
}
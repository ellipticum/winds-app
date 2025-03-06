'use client'

import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from 'react'
import { IProject } from '@/entities/Project/model/interfaces/project'
import { mockProjects } from '@/entities/Project/model/data/mockProjects'
import { ILayoutProps } from '@/shared/interfaces/layoutProps'
import { IRow } from '@/entities/Project/model/interfaces/row'

interface IContext {
    isLoading: boolean
    setIsLoading: Dispatch<boolean>
    project: IProject | null
    setProject: Dispatch<IProject | null>
    rows: IRow[]
    setRows: Dispatch<SetStateAction<IRow[]>>
    editableRow: number | null
    setEditableRow: Dispatch<SetStateAction<number | null>>
}

const ProjectsContext = createContext<IContext | null>(null)

export const useProjects = () => {
    const value = useContext(ProjectsContext)

    if (!value) {
        throw new Error(`${ProjectsContext.displayName} must be inside the provider.`)
    }

    return value
}

interface Props extends ILayoutProps {}

const ProjectsProvider = ({ children }: Props) => {
    const [project, setProject] = useState<IProject | null>(mockProjects[4])
    const [rows, setRows] = useState<IRow[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [editableRow, setEditableRow] = useState<number | null>(null)

    return (
        <ProjectsContext.Provider
            value={{
                isLoading,
                setIsLoading,
                project,
                setProject,
                rows,
                setRows,
                editableRow,
                setEditableRow
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsProvider

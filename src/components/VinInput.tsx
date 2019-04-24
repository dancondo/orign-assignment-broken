import * as React from "react"
import { bindBem } from "../utils/bem"
import "./VinInput.scss"

const { block, element } = bindBem("VinInput")

interface Props {
    value: string
    error?: string
    onChange: (value: string) => void
    className?: string
}

export const VinInput: React.SFC<Props> = ({ className, error, onChange, value }) => (
    <div className={block({ invalid: !!error }, className)}>
        <input value={value} onChange={e => onChange(e.target.value)} />
        <div className={element("Error")}>{error}</div>
    </div>
)

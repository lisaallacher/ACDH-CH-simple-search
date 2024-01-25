import { ReactElement } from "react"

/**
 * Props for the Heading component that is a string
 * @interface
 */
type HeadingProps = {title: string}

/**
 * heading component for rendering titles
 * @component
 * @param {HeadingProps} props props for the Heading component
 * @returns {ReactElement} - JSX Element representing the Heading
 */
const Heading = ({ title }: HeadingProps): ReactElement => {
  return <h1 className="text-5xl font-bold m-6 flex justify-center items-center">{title}</h1>
}

export default Heading
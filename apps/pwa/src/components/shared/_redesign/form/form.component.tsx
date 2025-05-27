import { ComponentProps } from "react";

export namespace Form {
    export type Props = ComponentProps<"form">;
}

export const Form = ({ ...props }: Form.Props) => {
    return (
        <form {...props} />
    );
};
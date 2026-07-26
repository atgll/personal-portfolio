import {Fragment, type ReactElement} from "react";

export default function Policies(): ReactElement {
    const policiesList: string[] = ['Política de cookies (UE)', 'Política de privacidad']
    return (
        <div className="d-flex justify-center align-center gap-1">
            {
                policiesList.map((policy: string, idx: number) => (
                    <Fragment key={policy}>
                        {idx > 0 && <span className="zen-new fs-m fw-400"> | </span>}
                        <a className="link zen-new fs-m" href="#!">
                            {policy}
                        </a>
                    </Fragment>
                ))}
        </div>
    );
}
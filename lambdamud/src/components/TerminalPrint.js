import React from 'react';

export default function TerminalPrint(props) {
    return(
        <div>
            <div className="terminal-print">
                {props.output.message}
            </div>
        </div>
    );
}

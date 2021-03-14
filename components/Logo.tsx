export function Logo ({logoText}: {logoText: string}) {
    return (
        <>
            <div className="level">
                <div className="level-item">
                    <h3 className="title is-3 has-text-white is-family-secondary" style={{pointerEvents: 'none'}}>
                        <i className="fas fa-robot"></i>&nbsp;&nbsp;
                    </h3>
                </div>
                <div className="level-item">
                    <h4 className="title is-4 has-text-white is-family-secondary" style={{pointerEvents: 'none'}}>
                        {logoText}
                    </h4>
                </div>
            </div>
        </>
    );
}

import styled from 'styled-components'

export const TerminalPromptForm = styled.form`
    bottom: 0;
    font-family: monospace;
    font-size: 14px;
    padding-top: 20px;
    display: grid;
    justify-items: start;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;

    @media(max-width: 820px) {
        grid-template-columns: 1fr;
        justify-items: center;
    }
`

export const Feed = styled.div`
    font-family: monospace;
    padding-top: 40px;
`

export const FeedItems = styled.div`
    display: grid;
    grid-template-columns: repeat( 1, minmax(400px, 1fr) );
    grid-template-rows: 50px;
    @media(max-width: 820px) {
        grid-template-columns: 1fr;
    }
`
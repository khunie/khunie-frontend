import styled from 'styled-components';

export const Container = styled.div`
    flex: 0 0 260px;
`;

export const Content = styled.div`
    padding: 8px;
    background-color: #fafafa;
    border-radius: 6px;
`;

export const ModalBody = styled.div`
    width: 800px;
    height: 400px;
`;

export const TeamForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 300px;
`;

export const TeamInput = styled.input`
    height: 32px;
    border-radius: 4px;
    font-size: 16px;
    text-indent: 4px;
    box-sizing: border-box;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
    color: #555;
`;

export const CreateTeamButton = styled.button`
    width: 100%;
    height: 32px;
    border-radius: 4px;
    box-shadow: none;
    border-color: transparent;
    background-color: #4643da;
    color: white;
    font-weight: bold;
    margin: 8px 0;

    &:disabled {
        background-color: #9291cf;
    }

    &:hover:enabled {
        cursor: pointer;
        background-color: #3835ce;
    }

    &:active:enabled {
        background-color: #2e2bc5;
    }
`;

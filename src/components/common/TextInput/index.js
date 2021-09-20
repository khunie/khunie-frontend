import { Input } from './styles';

export default function TextInput({ type = 'text', forwardRef, ...rest }) {
    return <Input type={type} ref={forwardRef} {...rest} />;
}

import { Input } from './styles';

export default function TextInput({ forwardRef, ...rest }) {
    return <Input ref={forwardRef} {...rest} />;
}

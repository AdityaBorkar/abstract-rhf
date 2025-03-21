import { useForm } from './useForm';

// TODO: Sole purpoes of this is to make it easy to construct type-safe hooks

export function createFormHook() {
	return useForm({
		resolver: zodResolver(schema),
	});
}

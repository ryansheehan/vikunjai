import type {PageServerLoad, Actions} from './$types';
import { superValidate, fail, message, type Infer } from 'sveltekit-superforms';
import { promptFormSchema, extractResponse, type PromptResponse, type PromptFormData } from '$lib/forms/prompt/prompt-form-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const load: PageServerLoad = async ({}) => {
    return {
        form: await superValidate<PromptFormData, PromptResponse>(zod(promptFormSchema)),
    };
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate<PromptFormData, PromptResponse>(event, zod(promptFormSchema));
        if (!form.valid) {
            return fail(400, {form})
        }

        const response = await event.locals.model.invoke([
            new HumanMessage(form.data.prompt),
        ]);        

        const {content} = extractResponse(response);

        return { form, content }
    },
}


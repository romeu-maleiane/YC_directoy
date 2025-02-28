'use client'
import { useState, useActionState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from 'zod'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { creatPitch } from "@/lib/action";



export default function StartupF() {
    const [error, setError] = useState({})
    const [pitch, setPitch] = useState("");
    const [state, formAction, isPeding] = useActionState(handleFormSubmit, 
        { error: '',
        status: 'INITIAL',
    })

    const router = useRouter()

    async function handleFormSubmit(prevState: any, formData: FormData){
        try {
            const fotmValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch
            }
            await formSchema.parseAsync(fotmValues)

            console.log(fotmValues)
            const result = await creatPitch(prevState, formData, pitch)

            console.log(result)
            if(result.status == 'SUCCESS'){
                toast.success('Your startup pitch has been created successfuly')
            
                router.push(`/startup/${result._id}`)
            }

            return result
        } catch(error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors
                setError(fieldErrors as unknown as Record<string, string>)
                
                toast.error('Please check inputs and try again')

                return {...prevState, error: 'validation failed', status: 'ERRO'}
            }

            toast.error('An unexpected error has occured')
            return {
                ...prevState,
                error: 'An unexpected error has occured',
                status: 'ERROR'
            }

        }
    }
    return <>
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />
                {error.title && <p className="startup-form_error">{error.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />
                {error.description && <p className="startup-form_error">{error.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category(Tech, Health, Education...)"
                />
                {error.category && <p className="startup-form_error">{error.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />
                {error.link && <p className="startup-form_error">{error.link}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={value => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{borderRadius: '20', overflow: 'hidden'}}
                    textareaProps={{
                        placeholder: 
                        'Brief describe your idea and what problem it solves'
                    }}
                    previewOptions={{
                        disallowedElements: ['styles']
                    }}
                />
                {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
            </div>

            <button type="submit" className="startup-form_btn flex justify-center text-white" disabled={isPeding}>
                {isPeding ? 'Submiting...' : 'Sumit Your Startup'} 
                <span><Send className="size-6 ml-2"/></span>
            </button>
        </form>
    </>
}
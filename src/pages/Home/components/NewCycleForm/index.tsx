import { useForm } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from './style'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutesAmount: z.number().min(1).max(95),
})

type newCycleFormData = z.infer<typeof newCycleFormSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="task">I&#39;ll be working on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Name your task"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="projetos"></option>
      </datalist>

      <label htmlFor="minutesAmount">for the next</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={95}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}

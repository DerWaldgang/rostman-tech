'use client';

import { useForm, type Resolver, type FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { useWithdrawStore } from '@/store/withdraw-store';
import { WithdrawFormView } from '@/components/withdraw-form-view';
import { WithdrawStatus } from '@/components/withdraw-status';
import type { WithdrawFormValues } from '@/types/withdraw';

const withdrawSchema = z.object({
  amount: z.coerce
    .number({ error: 'Введите корректную сумму' })
    .gt(0, 'Сумма должна быть больше 0'),
  destination: z.string().min(1, 'Укажите адрес назначения'),
  confirmed: z
    .boolean()
    .refine((val) => val === true, { message: 'Необходимо подтвердить вывод' }),
});

function zodResolver(
  schema: z.ZodType<WithdrawFormValues>,
): Resolver<WithdrawFormValues> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const flat = z.flattenError(result.error);
    const errors: FieldErrors<WithdrawFormValues> = {};
    for (const [field, messages] of Object.entries(flat.fieldErrors)) {
      const msg = (messages as string[] | undefined)?.[0];
      if (msg) {
        (errors as Record<string, { type: string; message: string }>)[field] = {
          type: 'validation',
          message: msg,
        };
      }
    }
    return { values: {}, errors };
  };
}

export function WithdrawForm() {
  const status = useWithdrawStore((s) => s.status);
  const storeError = useWithdrawStore((s) => s.error);
  const submit = useWithdrawStore((s) => s.submit);

  const { register, handleSubmit, formState: { errors, isValid } } =
    useForm<WithdrawFormValues>({
      resolver: zodResolver(withdrawSchema),
      defaultValues: { amount: undefined, destination: '', confirmed: false },
      mode: 'onChange',
    });

  if (status === 'success') {
    return <WithdrawStatus />;
  }

  return (
    <WithdrawFormView
      register={register}
      errors={errors}
      isValid={isValid}
      isLoading={status === 'loading'}
      storeError={status === 'error' ? storeError : null}
      onSubmit={handleSubmit(submit)}
    />
  );
}

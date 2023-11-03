'use client';

import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateWorkspaceBodyRequest, WorkspaceCardInfo } from '@metrics/contracts';
import { hexColor } from '@metrics/contracts/src/http/defaultValidations/hexColor';
import { workspaceName } from '@metrics/contracts/src/http/defaultValidations/workspaceName';
import { workspaceSlug } from '@metrics/contracts/src/http/defaultValidations/workspaceSlug';
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { SketchPicker } from 'react-color';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/common/Button';
import { DialogBox } from '@/components/common/DialogBox';
import { defaultTheme } from '@/constants/defaultTheme';
import { workspaceQueryCache } from '@/constants/workspaceQueryCache';
import { queryClient } from '@/lib/queryClient';
import { workspaceService } from '@/services/api/workspaces';

export interface CreateWorkspaceModalProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const createWorkspaceFormSchema = z.object({
  name: workspaceName,
  slug: workspaceSlug,
  description: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  color: hexColor,
});

type CreateWorkspaceFormData = z.infer<typeof createWorkspaceFormSchema>;

export function CreateWorkspaceModal({ isOpen = false, onOpenChange }: CreateWorkspaceModalProps) {
  const form = useForm<CreateWorkspaceFormData>({
    resolver: zodResolver(createWorkspaceFormSchema),
  });

  const { getToken } = useAuth();

  const {
    mutateAsync: createWorkspace,
    error: errorOnCreateWorkspace,
    isPending: isCreatingWorkspace,
  } = useMutation({
    mutationFn: async (data: CreateWorkspaceBodyRequest) =>
      workspaceService.injectAccessToken(await getToken()).create(data),
  });

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isValid, errors },
    control,
  } = form;

  async function handleCreateWorkspace(data: CreateWorkspaceFormData) {
    const workspaceCreated = await createWorkspace(data);

    let workspaces = queryClient.getQueryData<WorkspaceCardInfo[]>(workspaceQueryCache.workspaces());

    if (!workspaces) {
      workspaces = [];
    }

    workspaces.push({
      name: workspaceCreated.name,
      slug: workspaceCreated.slug,
      logoUrl: workspaceCreated.logoUrl,
      userRole: workspaceCreated.userRole,
      totalMembers: workspaceCreated.totalMembers,
    });

    queryClient.setQueryData(workspaceQueryCache.workspaces(), workspaces);

    toast.success('Workspace created successfully');

    reset();
    clearErrors();
    onOpenChange?.(false);
  }

  function handleCancel(closeFn: () => void) {
    reset();
    clearErrors();
    closeFn();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create Workspace</ModalHeader>
            <ModalBody>
              {errorOnCreateWorkspace && <DialogBox className="mb-4">{errorOnCreateWorkspace.message}</DialogBox>}

              <form className="space-y-2.5" onSubmit={handleSubmit(handleCreateWorkspace)} noValidate>
                <Input label="Name" isRequired {...register('name')} errorMessage={errors.name?.message} />

                <Input label="Slug" isRequired {...register('slug')} errorMessage={errors.slug?.message} />

                <Input label="Description" {...register('description')} errorMessage={errors.description?.message} />

                <Controller
                  control={control}
                  defaultValue={defaultTheme.color}
                  name="color"
                  render={({ field: { onChange, value, ...field } }) => (
                    <div className="flex items-center gap-3.5">
                      <SketchPicker {...field} color={value} onChange={(color) => onChange(color.hex)} disableAlpha />

                      <Input label="Color" readOnly value={value} className="w-fit" />
                    </div>
                  )}
                />

                <ModalFooter className="items-center">
                  <Button variant="ghost" onClick={() => handleCancel(onClose)} type="button">
                    Cancel
                  </Button>
                  <Button loading={isCreatingWorkspace} disabled={!isValid} type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

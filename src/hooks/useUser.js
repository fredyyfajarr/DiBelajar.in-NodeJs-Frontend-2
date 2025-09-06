// src/hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import userService from '/src/api/userService.js';

export const useUserProfile = (slug) => {
  return useQuery({
    queryKey: ['userProfile', slug],
    queryFn: () => userService.getUserProfile(slug),
    enabled: !!slug,
  });
};

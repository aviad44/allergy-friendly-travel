-- profiles_no_public_read: restrict profile visibility to the owner only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- reviews_anonymous_insert: require a real authenticated user on insert
DROP POLICY IF EXISTS "Authenticated users can create their own reviews" ON public.reviews;
CREATE POLICY "Authenticated users can create their own reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NOT NULL AND auth.uid() = user_id);
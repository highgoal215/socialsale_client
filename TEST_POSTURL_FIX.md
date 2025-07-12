# Post/Video URL Field Fix - Test Documentation

## Issue Fixed
Some services (like followers) were incorrectly showing Post/Video URL fields in the order system, while others (likes, views, comments) were missing them when they should be required.

## Changes Made

### 1. Checkout.tsx
- **Before**: Post/Video URL field was shown for all services but marked as optional for followers
- **After**: Post/Video URL field is only shown for non-follower services (likes, views, comments) and is required
- **Logic**: `!service.includes('Followers')` determines if the field should be shown

### 2. Order.tsx
- **Before**: Post/Video URL field was always shown and required
- **After**: Post/Video URL field is only shown for non-follower services and is required
- **Added**: Username field that was missing
- **Logic**: Same as Checkout.tsx

### 3. Validation Logic
- **Frontend**: Validates that postUrl is provided for non-follower services
- **Backend**: Already correctly handles this (postUrl required for likes/views/comments, optional for followers)

## Test Cases

### Test Case 1: Instagram Followers
1. Navigate to Instagram Followers page
2. Select a package and proceed to checkout
3. **Expected**: Post/Video URL field should NOT be visible
4. **Expected**: Form should submit successfully with just username and email

### Test Case 2: Instagram Likes
1. Navigate to Instagram Likes page
2. Select a package and proceed to checkout
3. **Expected**: Post/Video URL field should be visible and required
4. **Expected**: Form should show validation error if postUrl is empty

### Test Case 3: TikTok Views
1. Navigate to TikTok Views page
2. Select a package and proceed to checkout
3. **Expected**: Post/Video URL field should be visible and required
4. **Expected**: Placeholder should show "Enter the URL of your TikTok video"

### Test Case 4: YouTube Comments
1. Navigate to YouTube Comments page
2. Select a package and proceed to checkout
3. **Expected**: Post/Video URL field should be visible and required
4. **Expected**: Placeholder should show "Enter the URL of your YouTube video"

## Backend Compatibility
The backend already correctly handles this logic:
- For followers: postUrl is optional
- For likes/views/comments: postUrl is required

## Files Modified
1. `likes-client/src/pages/Checkout.tsx`
2. `likes-client/src/pages/Order.tsx`

## Verification Steps
1. Start the client: `npm run dev`
2. Test each service type (followers, likes, views, comments) for each platform (Instagram, TikTok, YouTube)
3. Verify that followers don't show postUrl field
4. Verify that likes/views/comments show postUrl field as required
5. Test form validation for each case 
# Functionalities Analysis

## 1. Use a Popular Authentication Library or Auth Service

-   **Description**: Utilize widely adopted librarie `Microsoft.AspNetCore.Authentication.JwtBearer` to handle core authentication functionalities like registration, login, password management, and token generation.

---

## 2. Social Login: Google OpenID

-   **Description**: Allow users to log in using their Google accounts via OAuth 2.0.
-   **Key Features**:
    -   Reduces friction during login/registration by minimizing the need for form filling.
    -   Fetches basic user profile details (e.g., email, name) for account creation or linking.
-   **Implementation**:
    -   Use libraries like `Microsoft.AspNetCore.Authentication.Google`
    -   Configure OAuth credentials in the app settings and obtain client IDs and secrets.
-   **User Flow**:
    1. User clicks "Login with Google/Facebook."
    2. Redirect to the provider’s login page.
    3. Upon successful login, receive and validate an access token.
    4. Retrieve user information and log them in.

---

## 3. Register an Account

-   **Description**: Enable users to create an account by providing basic information such as email and password.
-   **Key Features**:
    -   Validate input fields (e.g., strong password rules, unique email).
    -   Hash and store the password securely using SHA256.

---

## 4. Account Activation by Email

-   **Description**: Require users to confirm their email before activating their account to ensure validity and reduce spam.
-   **User Flow**:
    1. After registration, generate a unique activation token.
    2. Send an email with the token of 6 digits
    3. User fill in 6 digits to activate account
-   **Implementation**:
    -   Use email services `SendGrid`.
    -   Set expiration time for tokens to improve security: 15 minus

---

## 5. Restrict Feature Access Based on User’s Role

-   **Description**: Implement role-based access control (RBAC) to limit features and resources based on roles
-   **Key Features**:
    -   Use middleware or attributes to check permissions before allowing access to certain endpoints.
-   **Examples**:
    -   User: Access to profile and general features.

---

## 6. Forgot Password and Renew Password by Email

-   **Description**: Allow users to reset their password securely in case they forget it.
-   **User Flow**:
    1. User submits their email for password recovery.
    2. Generate a password reset token and send it via email.
    3. User clicks the link, enters a new password, and submits it.
    4. Validate the token and update the password in the database.
-   **Implementation**:
    -   Use secure random tokens with expiration times.
    -   Encrypt tokens before sending them to users.

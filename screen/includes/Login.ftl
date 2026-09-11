<#-- qapps2 independent login page. Vue/Quasar boot in Login.js (footer). -->
<#macro loginField name type="text" label="" value="" id="" required=true disabled=false extraClass="q-mb-sm">
    <label class="qapps2-login-label"<#if id?has_content> for="${id}"</#if>>${label}</label>
    <input class="qapps2-login-input ${extraClass}" name="${name}" type="${type}" value="${value}"
           <#if id?has_content>id="${id}"</#if> <#if required>required="required"</#if> <#if disabled>disabled="disabled"</#if>
           placeholder="${label}" aria-label="${label}">
</#macro>
<#assign headerLogoList = sri.getThemeValues("STRT_HEADER_LOGO")>
<#assign loginTab = (initialTab!"#login")?replace("#","")>
<#if !loginTab?has_content><#assign loginTab = "login"></#if>
<div id="login-root" class="qapps2-login" style="display:none;">
    <input type="hidden" id="confLoginTab" value="${loginTab?html}">
    <input type="hidden" id="confLoginLocale" value="${(ec.user.locale.toLanguageTag())!''}">
    <canvas id="qapps2-login-bg" class="qapps2-login-bg" aria-hidden="true"
            style="position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;"></canvas>
    <#if (loginBg.imageUrl)!?has_content>
        <div id="qapps2-login-photo" class="qapps2-login-photo" hidden="hidden" aria-hidden="true"
             data-src="${loginBg.imageUrl?html}"></div>
        <div id="qapps2-login-photo-overlay" class="qapps2-login-photo-overlay" hidden="hidden" aria-hidden="true"></div>
        <p id="qapps2-login-credit" class="qapps2-login-credit" hidden="hidden">
            <#if (loginBg.source)! == 'local'>
                ${ec.l10n.localize("Login background")}
            <#else>
                <#assign creditName = (loginBg.artist)!''>
                <#if !creditName?has_content><#assign creditName = (loginBg.credit)!ec.l10n.localize("Wikimedia Commons")></#if>
                <#if (loginBg.filePage)!?has_content>
                    <a href="${loginBg.filePage?html}" target="_blank" rel="noopener noreferrer">${creditName?html}</a>
                <#else>
                    ${creditName?html}
                </#if>
                <#if (loginBg.licenseUrl)!?has_content && (loginBg.license)!?has_content>
                    <span aria-hidden="true"> · </span>
                    <a href="${loginBg.licenseUrl?html}" target="_blank" rel="noopener noreferrer">${loginBg.license?html}</a>
                <#elseif (loginBg.license)!?has_content>
                    <span aria-hidden="true"> · </span>${loginBg.license?html}
                </#if>
            </#if>
        </p>
    </#if>

    <q-btn class="qapps2-login-toggle" flat round dense icon="invert_colors" @click="toggleDark">
        <q-tooltip>${ec.l10n.localize("Switch Dark/Light")}</q-tooltip></q-btn>

    <q-card class="qapps2-login-card" flat bordered>
        <q-card-section>
            <#if headerLogoList?has_content>
                <img class="qapps2-login-logo" src="${sri.buildUrl(headerLogoList?first).getUrl()}" alt="${ec.l10n.localize("Home")}">
            </#if>

            <#list (ec.web.savedMessages)! as message>
                <q-banner dense rounded class="bg-positive text-white q-mb-sm">${message?html}</q-banner>
            </#list>
            <#list (ec.web.savedErrors)! as errorMessage>
                <q-banner dense rounded class="bg-negative text-white q-mb-sm">${errorMessage?html}</q-banner>
            </#list>
            <#list (ec.message.errors)! as errorMessage>
                <q-banner dense rounded class="bg-negative text-white q-mb-sm">${errorMessage?html}</q-banner>
            </#list>
            <#list (ec.web.savedValidationErrors)! as validationError>
                <q-banner dense rounded class="bg-negative text-white q-mb-sm">${validationError.message?html}</q-banner>
            </#list>

            <#if needsSetup!false>
                <div class="text-h6 text-center q-mb-sm">${ec.l10n.localize("Welcome to your new system")}</div>
                <p class="text-grey text-center">${ec.l10n.localize("There are no user accounts, get started by creating an initial administrator account")}</p>
                <form method="post" action="${sri.buildUrl("createInitialAdminAccount").url}">
                    <input type="hidden" name="moquiSessionToken" value="${ec.web.sessionToken}">
                    <@loginField name="username" label=ec.l10n.localize("Username") value=((ec.web.errorParameters.username)!'')?html/>
                    <@loginField name="newPassword" type="password" label=ec.l10n.localize("New Password")/>
                    <@loginField name="newPasswordVerify" type="password" label=ec.l10n.localize("New Password Verify")/>
                    <@loginField name="userFullName" label=ec.l10n.localize("User Full Name") value=((ec.web.errorParameters.userFullName)!'')?html/>
                    <@loginField name="emailAddress" label=ec.l10n.localize("Email Address") value=((ec.web.errorParameters.emailAddress)!'')?html extraClass="q-mb-md"/>
                    <q-btn unelevated no-caps color="primary" class="full-width" type="submit"
                           label="${ec.l10n.localize("Create Initial Admin Account")}"></q-btn>
                </form>
            <#else>
                <q-tabs v-model="tab" dense no-caps active-color="primary" indicator-color="primary" align="justify" class="q-mb-md">
                    <q-tab name="login" label="${ec.l10n.localize("Login")}"></q-tab>
                    <#if authFlowList?has_content && !authFlowList.isEmpty()>
                    <q-tab name="sso" label="${ec.l10n.localize("SSO")}"></q-tab>
                    </#if>
                    <q-tab name="reset" label="${ec.l10n.localize("Reset Password")}"></q-tab>
                    <q-tab name="change" label="${ec.l10n.localize("Change Password")}"></q-tab>
                </q-tabs>

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="login" class="q-pa-none">
                        <form method="post" action="${sri.buildUrl("login").url}" id="login_form">
                            <input type="hidden" name="initialTab" value="login">
                            <@loginField name="username" id="login_form_username" label=ec.l10n.localize("Username")
                                    value=(username!'')?html disabled=(username?has_content && secondFactorRequired)!false/>
                            <#if secondFactorRequired>
                                <@loginField name="code" id="login_form_code" type="password" extraClass="q-mb-md"
                                        label=ec.l10n.localize("Authentication Code")/>
                            <#else>
                                <@loginField name="password" type="password" extraClass="q-mb-md" label=ec.l10n.localize("Password")/>
                            </#if>
                            <#if expiredCredentials><q-banner dense rounded class="bg-warning text-black q-mb-sm">${ec.l10n.localize("WARNING: Your password has expired")}</q-banner></#if>
                            <#if passwordChangeRequired><q-banner dense rounded class="bg-warning text-black q-mb-sm">${ec.l10n.localize("WARNING: Password change required")}</q-banner></#if>
                            <q-btn unelevated no-caps color="primary" class="full-width" type="submit"
                                   label="${ec.l10n.localize("Sign in")}"></q-btn>
                        </form>
                    </q-tab-panel>

                    <#if authFlowList?has_content && !authFlowList.isEmpty()>
                    <q-tab-panel name="sso" class="q-pa-none">
                        <#list authFlowList as authFlow>
                            <form method="post" action="/sso/login" class="q-mb-sm">
                                <input type="hidden" name="authFlowId" value="${authFlow.authFlowId}">
                                <q-btn outline no-caps color="primary" class="full-width" type="submit"
                                       label="${(authFlow.description!authFlow.authFlowId)?html}"></q-btn>
                            </form>
                        </#list>
                    </q-tab-panel>
                    </#if>

                    <q-tab-panel name="reset" class="q-pa-none">
                        <form method="post" action="${sri.buildUrl("resetPassword").url}" id="reset_form">
                            <p class="text-grey text-center">${ec.l10n.localize("Enter your username to email a reset password")}</p>
                            <input type="hidden" name="moquiSessionToken" value="${ec.web.sessionToken}">
                            <input type="hidden" name="initialTab" value="reset">
                            <@loginField name="username" id="reset_form_username" extraClass="q-mb-md"
                                    label=ec.l10n.localize("Username") value=(username!'')?html
                                    disabled=(username?has_content && secondFactorRequired)!false/>
                            <q-btn unelevated no-caps color="negative" class="full-width" type="submit"
                                   label="${ec.l10n.localize("Email Reset Password")}"></q-btn>
                        </form>
                    </q-tab-panel>

                    <q-tab-panel name="change" class="q-pa-none">
                        <form method="post" action="${sri.buildUrl("changePassword").url}" id="change_form">
                            <p class="text-grey text-center">${ec.l10n.localize("Enter details to change your password")}</p>
                            <input type="hidden" name="moquiSessionToken" value="${ec.web.sessionToken}">
                            <input type="hidden" name="initialTab" value="change">
                            <@loginField name="username" id="change_form_username" label=ec.l10n.localize("Username")
                                    value=(username!'')?html disabled=(username?has_content && secondFactorRequired)!false/>
                            <#if secondFactorRequired>
                                <input type="hidden" name="oldPassword" value="ignored">
                                <@loginField name="code" id="change_form_code" type="password"
                                        label=ec.l10n.localize("Authentication Code")/>
                            <#else>
                                <@loginField name="oldPassword" type="password" label=ec.l10n.localize("Old Password")/>
                            </#if>
                            <@loginField name="newPassword" type="password" label=ec.l10n.localize("New Password")/>
                            <@loginField name="newPasswordVerify" type="password" extraClass="q-mb-md"
                                    label=ec.l10n.localize("New Password Verify")/>
                            <q-btn unelevated no-caps color="negative" class="full-width" type="submit"
                                   label="${ec.l10n.localize("Change Password")}"></q-btn>
                            <p class="text-grey text-center q-mt-md">${ec.l10n.localize("Password must be at least")} ${minLength} ${ec.l10n.localize("characters")}
                                ${ec.l10n.localize("with at least")} ${minDigits} ${ec.l10n.localize("number")}<#if (minDigits > 1)>s</#if>
                                <#if (minOthers > 0)> ${ec.l10n.localize("and at least")} ${minOthers} ${ec.l10n.localize("punctuation character")}<#if (minOthers > 1)>s</#if></#if></p>
                        </form>
                    </q-tab-panel>
                </q-tab-panels>

                <#if secondFactorRequired>
                    <p class="text-center q-mt-md">${ec.l10n.localize("An authentication code is required for your account, you have these options:")}</p>
                    <ul>
                        <#list (factorTypeDescriptions)! as factorType>
                            <li>${factorType?html}</li>
                        </#list>
                    </ul>
                    <#list (sendableFactors)! as userAuthcFactor>
                        <form method="post" action="${sri.buildUrl("sendOtp").url}" class="q-mb-sm">
                            <input type="hidden" name="factorId" value="${userAuthcFactor.factorId}">
                            <input type="hidden" name="moquiSessionToken" value="${ec.web.sessionToken}">
                            <input type="hidden" name="initialTab" class="initial-tab" :value="tab">
                            <q-btn outline no-caps color="primary" class="full-width" type="submit"
                                   label="${ec.l10n.localize("Send code to")} ${(userAuthcFactor.factorOption!)?html}"></q-btn>
                        </form>
                    </#list>
                </#if>

                <#if (ec.web.sessionAttributes.get("moquiPreAuthcUsername"))?has_content>
                    <form method="post" action="${sri.buildUrl("removePreAuth").url}" class="q-mt-md">
                        <input type="hidden" name="moquiSessionToken" value="${ec.web.sessionToken}">
                        <q-btn outline no-caps class="full-width" type="submit" label="${ec.l10n.localize("Change User")}"></q-btn>
                    </form>
                </#if>

                <#if showTestLogin!false>
                    <form method="post" action="${sri.buildUrl("login").url}" id="TestLoginLink" class="q-mt-lg text-center">
                        <input type="hidden" name="username" value="john.doe">
                        <input type="hidden" name="password" value="moqui">
                        <q-btn outline no-caps color="primary" type="submit" id="TestLoginLink_button"
                               label="${ec.l10n.localize("Test Login (John Doe)")}"></q-btn>
                    </form>
                </#if>
            </#if>
        </q-card-section>
    </q-card>
</div>

<script>
    window.quasarConfig = {
        brand: {
            primary: '#1677ff',
            secondary: '#13c2c2',
            accent: '#722ed1',
            dark: '#1f1f1f',
            positive: '#52c41a',
            negative: '#ff4d4f',
            info: '#1677ff',
            warning: '#faad14'
        }
    };
</script>

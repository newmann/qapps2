<#--
qapps2 Vue 3 + Quasar 2 shell. Independent copy of WebrootVue.qvt.ftl.
-->
<div id="apps-root" style="display:none;">
    <input type="hidden" id="confMoquiSessionToken" value="${ec.web.sessionToken}">
    <input type="hidden" id="confAppHost" value="${ec.web.getHostName(true)}">
    <input type="hidden" id="confAppRootPath" value="${ec.web.servletContext.contextPath}">
    <input type="hidden" id="confBasePath" value="${ec.web.servletContext.contextPath}/apps">
    <input type="hidden" id="confLinkBasePath" value="${ec.web.servletContext.contextPath}/qapps2">
    <input type="hidden" id="confUserId" value="${ec.user.userId!''}">
    <input type="hidden" id="confUsername" value="${ec.user.username!''}">
    <input type="hidden" id="confLocale" value="${ec.user.locale.toLanguageTag()}">
    <input type="hidden" id="confDarkMode" value="${ec.user.getPreference("QUASAR_DARK")!"false"}">
    <input type="hidden" id="confLeftOpen" value="${ec.user.getPreference("QUASAR_LEFT_OPEN")!"false"}">
    <#assign navbarCompList = sri.getThemeValues("STRT_HEADER_NAVBAR_COMP")>
    <#list navbarCompList! as navbarCompUrl><input type="hidden" class="confNavPluginUrl" value="${navbarCompUrl}"></#list>
    <#assign accountCompList = sri.getThemeValues("STRT_HEADER_ACCOUNT_COMP")>
    <#list accountCompList! as accountCompUrl><input type="hidden" class="confAccountPluginUrl" value="${accountCompUrl}"></#list>

    <#assign headerClass = "bg-black text-white">

    <q-layout view="hHh LpR fFf">
        <q-header reveal bordered class="${headerClass}" id="top"><q-toolbar style="font-size:15px;">
            <q-btn dense flat icon="menu" @click="toggleLeftOpen()"></q-btn>

            <#assign headerLogoList = sri.getThemeValues("STRT_HEADER_LOGO")>
            <#if headerLogoList?has_content>
                <m-link href="/apps"><div class="q-mx-md q-mt-sm">
                    <img src="${sri.buildUrl(headerLogoList?first).getUrl()}" alt="Home" height="32">
                </div></m-link>
            </#if>
            <#assign headerTitleList = sri.getThemeValues("STRT_HEADER_TITLE")>
            <#if headerTitleList?has_content>
            <q-toolbar-title>${ec.resource.expand(headerTitleList?first, "")}</q-toolbar-title>
            </#if>

            <template v-for="(navMenuItem, menuIndex) in navMenuList"><template v-if="menuIndex < (navMenuList.length - 1)">
                <m-link v-if="navMenuItem.hasTabMenu" :href="getNavHref(menuIndex)" class="gt-xs">{{navMenuItem.title}}</m-link>
                <div v-else-if="navMenuItem.subscreens && navMenuItem.subscreens.length" class="cursor-pointer gt-xs">
                    {{navMenuItem.title}}
                    <q-menu anchor="bottom left" self="top left"><q-list dense style="min-width: 200px">
                        <q-item v-for="subscreen in navMenuItem.subscreens" :key="subscreen.name" :class="{'bg-primary':subscreen.active, 'text-white':subscreen.active}" clickable v-close-popup><q-item-section>
                            <m-link :href="subscreen.pathWithParams">
                                <template v-if="subscreen.image">
                                    <i v-if="subscreen.imageType === 'icon'" :class="subscreen.image" style="padding-right: 4px;"></i>
                                    <img v-else :src="subscreen.image" :alt="subscreen.title" width="18" class="invertible" style="padding-right: 4px;">
                                </template>
                                <i v-else class="fa fa-link" style="padding-right: 8px;"></i>
                                {{subscreen.title}}
                            </m-link>
                        </q-item-section></q-item>
                    </q-list></q-menu>
                </div>
                <m-link v-else :href="getNavHref(menuIndex)" class="gt-xs">{{navMenuItem.title}}</m-link>

                <q-icon size="1.5em" name="chevron_right" color="grey" class="gt-xs"></q-icon>
            </template></template>
            <m-link v-if="navMenuList.length > 0" :href="getNavHref(navMenuList.length - 1)" class="gt-xs">{{navMenuList[navMenuList.length - 1].title}}</m-link>

            <q-space></q-space>

            <q-circular-progress indeterminate size="20px" color="light-blue" class="q-ma-xs" :class="{ hidden: loading < 1 }"></q-circular-progress>

            <component :is="qzVue" ref="qzVue"></component>

            <q-btn dense flat icon="help_outline" color="info" :class="{hidden:!documentMenuList.length}">
                <q-tooltip>${ec.l10n.localize("Documentation")}</q-tooltip>
                <q-menu><q-list dense class="q-my-md">
                    <q-item v-for="screenDoc in documentMenuList" :key="screenDoc.index"><q-item-section>
                        <m-dynamic-dialog :url="currentPath + '/screenDoc?docIndex=' + screenDoc.index" :button-text="screenDoc.title" :title="screenDoc.title"></m-dynamic-dialog>
                    </q-item-section></q-item>
                </q-list></q-menu>
            </q-btn>

            <template v-for="navPlugin in navPlugins" :key="navPlugin"><component :is="navPlugin"></component></template>

            <q-btn dense flat icon="notifications">
                <q-tooltip>${ec.l10n.localize("Notify History")}</q-tooltip>
                <q-menu><q-list dense style="min-width: 300px">
                    <q-item v-for="histItem in notifyHistoryList" :key="histItem.time + histItem.message"><q-item-section>
                        <q-banner dense rounded class="text-white" :class="'bg-' + getQuasarColor(histItem.type)">
                            <strong>{{histItem.time}}</strong> <span>{{histItem.message}}</span>
                            <template v-if="histItem.link != null" v-slot:action>
                                <q-btn flat color="white" label="View" @click="setUrl(histItem.link)"></q-btn>
                            </template>
                        </q-banner>
                    </q-item-section></q-item>
                </q-list></q-menu>
            </q-btn>

            <q-btn dense flat icon="history">
                <q-tooltip>${ec.l10n.localize("Screen History")}</q-tooltip>
                <q-menu><q-list dense style="min-width: 300px">
                    <q-item v-for="histItem in navHistoryList" :key="histItem.pathWithParams" clickable v-close-popup><q-item-section>
                        <m-link :href="histItem.pathWithParams">
                            <template v-if="histItem.image">
                                <i v-if="histItem.imageType === 'icon'" :class="histItem.image" style="padding-right: 8px;"></i>
                                <img v-else :src="histItem.image" :alt="histItem.title" width="18" style="padding-right: 4px;">
                            </template>
                            <i v-else class="fa fa-link" style="padding-right: 8px;"></i>
                            {{histItem.title}}
                        </m-link>
                    </q-item-section></q-item>
                </q-list></q-menu>
            </q-btn>

            <q-btn dense flat icon="account_circle">
                <q-tooltip>${(ec.user.userAccount.userFullName)!ec.l10n.localize("Account")}</q-tooltip>
                <q-menu><q-card flat bordered>
                    <q-card-section horizontal class="q-pa-md">
                        <q-card-section>
                            <#if (ec.user.userAccount.userFullName)?has_content><div class="q-mb-sm text-strong">${ec.l10n.localize("Welcome")} ${ec.user.userAccount.userFullName}</div></#if>
                            <template v-for="accountPlugin in accountPlugins" :key="accountPlugin"><component :is="accountPlugin"></component></template>
                        </q-card-section>
                        <q-separator vertical></q-separator>
                        <q-card-actions vertical class="justify-around q-px-md">
                            <q-btn flat dense icon="settings_power" color="negative" type="a" href="${sri.buildUrl("/Login/logout").url}"
                                   @click.prevent="moqui.confirmHref($event, '${ec.l10n.localize("Logout")} ${(ec.user.userAccount.userFullName)!''}?')">
                                <q-tooltip>${ec.l10n.localize("Logout")} ${(ec.user.userAccount.userFullName)!''}</q-tooltip></q-btn>
                            <q-btn flat dense @click.prevent="switchDarkLight()" icon="invert_colors">
                                <q-tooltip>${ec.l10n.localize("Switch Dark/Light")}</q-tooltip></q-btn>
                            <q-btn flat dense icon="autorenew" color="negative" @click="reLoginShowDialog"><q-tooltip>Re-Login</q-tooltip></q-btn>
                        </q-card-actions>
                    </q-card-section>
                </q-card></q-menu>
            </q-btn>
        </q-toolbar></q-header>

        <q-drawer v-model="leftOpen" side="left" bordered>
            <q-btn dense flat icon="menu" @click="toggleLeftOpen()" class="lt-sm"></q-btn>
            <q-list dense padding><m-menu-nav-item :menu-index="0"></m-menu-nav-item></q-list>
        </q-drawer>

        <q-page-container class="q-ma-sm"><q-page>
            <m-subscreens-active></m-subscreens-active>
        </q-page></q-page-container>

        <q-footer reveal bordered class="bg-grey-9 text-white row q-pa-xs" id="footer">
            <#assign footerItemList = sri.getThemeValues("STRT_FOOTER_ITEM")>
            <#list footerItemList! as footerItem>
                <#assign footerItemTemplate = footerItem?interpret>
                <@footerItemTemplate/>
            </#list>
        </q-footer>
    </q-layout>
    <m-dialog v-model="reLoginShow" width="400" title="${ec.l10n.localize("Re-Login")}">
        <div v-if="reLoginMfaData">
            <div style="text-align:center;padding-bottom:10px">User <strong>{{username}}</strong> requires an authentication code, you have these options:</div>
            <div style="text-align:center;padding-bottom:10px">{{reLoginMfaData.factorTypeDescriptions.join(", ")}}</div>
            <q-form @submit.prevent="reLoginVerifyOtp" autocapitalize="off" autocomplete="off">
                <q-input v-model="reLoginOtp" name="code" type="password" :autofocus="true"
                         outlined stack-label label="${ec.l10n.localize("Authentication Code")}"></q-input>
                <q-btn outline no-caps color="primary" type="submit" label="${ec.l10n.localize("Sign in")}"></q-btn>
            </q-form>
            <div v-for="sendableFactor in reLoginMfaData.sendableFactors" :key="sendableFactor.factorId" style="padding:8px">
                <q-btn outline no-caps dense
                       :label="'${ec.l10n.localize("Send code to")} ' + sendableFactor.factorOption"
                       @click.prevent="reLoginSendOtp(sendableFactor.factorId)"></q-btn>
            </div>
        </div>
        <div v-else>
            <div style="text-align:center;padding-bottom:10px">Please sign in to continue as user <strong>{{username}}</strong></div>
            <q-form @submit.prevent="reLoginSubmit" autocapitalize="off" autocomplete="off">
                <q-input v-model="reLoginPassword" name="password" type="password" :autofocus="true"
                         outlined stack-label label="${ec.l10n.localize("Password")}"></q-input>
                <q-btn outline no-caps color="primary" type="submit" label="${ec.l10n.localize("Sign in")}"></q-btn>
                <q-btn outline no-caps color="negative" @click.prevent="reLoginReload" label="${ec.l10n.localize("Reload Page")}"></q-btn>
            </q-form>
        </div>
    </m-dialog>
</div>

<script>
    window.quasarConfig = {
        brand: {
            info:'#1e7b8e'
        },
        notify: { progress:true, closeBtn:'X', position:'top-right' },
        loadingBar: { color:'primary' }
    }
    if (!window.moqui) window.moqui = {};
    window.moqui.confirmLabels = {
        title: '${ec.l10n.localize("Confirm")?js_string}',
        ok: '${ec.l10n.localize("OK")?js_string}',
        cancel: '${ec.l10n.localize("Cancel")?js_string}'
    };
</script>

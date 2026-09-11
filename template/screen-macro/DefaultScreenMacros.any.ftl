<#--
This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License.

To the extent possible under law, the author(s) have dedicated all
copyright and related and neighboring rights to this software to the
public domain worldwide. This software is distributed without any
warranty.

You should have received a copy of the CC0 Public Domain Dedication
along with this software (see the LICENSE.md file). If not, see
<http://creativecommons.org/publicdomain/zero/1.0/>.
-->
<#-- NOTE: no empty lines before the first #macro otherwise FTL outputs empty lines -->
<#-- ==================== Includes ==================== -->
<#macro "include-screen">${sri.renderIncludeScreen(.node["@location"], .node["@share-scope"]!)}</#macro>

<#-- ============== Render Mode Elements ============== -->
<#-- qapps2: qvt2/qvue2/qjs2 also match qvt/qvue/qjs so business screens need not list *2 types -->
<#function qapps2TextTypeMatches typeAttr>
    <#if !typeAttr?has_content || typeAttr == "any"><#return true></#if>
    <#local types = typeAttr?split(",")>
    <#local mode = sri.getRenderMode()>
    <#if types?seq_contains(mode)><#return true></#if>
    <#if mode == "qvt2" && types?seq_contains("qvt")><#return true></#if>
    <#if mode == "qvue2" && types?seq_contains("qvue")><#return true></#if>
    <#if mode == "qjs2" && types?seq_contains("qjs")><#return true></#if>
    <#return false>
</#function>
<#-- original server-static="vuet,qvt" (and qvue/qjs) counts as static under qvt2/qvue2/qjs2 -->
<#function qapps2IsScreenServerStatic>
    <#local sd = sri.getActiveScreenDef()>
    <#local mode = sri.getRenderMode()!>
    <#if sd.isServerStatic(mode)><#return true></#if>
    <#if mode == "qvt2"><#return sd.isServerStatic("qvt")></#if>
    <#if mode == "qvue2"><#return sd.isServerStatic("qvue")></#if>
    <#if mode == "qjs2"><#return sd.isServerStatic("qjs")></#if>
    <#return false>
</#function>
<#function qapps2IsFormServerStatic formInstance>
    <#local mode = sri.getRenderMode()!>
    <#if formInstance.isServerStatic(mode)><#return true></#if>
    <#if mode == "qvt2"><#return formInstance.isServerStatic("qvt")></#if>
    <#if mode == "qvue2"><#return formInstance.isServerStatic("qvue")></#if>
    <#if mode == "qjs2"><#return formInstance.isServerStatic("qjs")></#if>
    <#return false>
</#function>
<#macro qapps2ApplyInheritedServerStaticHeader>
    <#if !ec.web??><#return></#if>
    <#local sd = sri.getActiveScreenDef()>
    <#local target = (sri.screenUrlInfo.targetScreen)!>
    <#if target?? && sd.location != target.location><#return></#if>
    <#if qapps2IsScreenServerStatic() && !sd.isServerStatic(sri.getRenderMode())>
        <#local resp = ec.web.getResponse()!>
        <#if resp??><#local ignored = resp.setHeader("Cache-Control", "max-age=86400, must-revalidate, public")!></#if>
    </#if>
</#macro>
<#macro "render-mode">
    <#if .node["text"]?has_content>
        <#list .node["text"] as textNode><#if !textNode["@type"]?has_content || textNode["@type"] == "any"><#local textToUse = textNode/></#if></#list>
        <#list .node["text"] as textNode><#if textNode["@type"]?has_content && qapps2TextTypeMatches(textNode["@type"])><#local textToUse = textNode></#if></#list>
        <#if textToUse??><@renderText textNode=textToUse/></#if>
    </#if>
</#macro>
<#macro text>
    <#if qapps2TextTypeMatches(.node["@type"]!)><@renderText textNode=.node/></#if>
</#macro>
<#macro renderText textNode>
    <#if textNode["@location"]?has_content>
        <#assign textLocation = ec.getResource().expandNoL10n(textNode["@location"], "")>
        <#if sri.doBoundaryComments() && textNode["@no-boundary-comment"]! != "true">
        <!-- BEGIN render-mode.text[@location=${textLocation}][@template=${textNode["@template"]!"true"}] -->
        </#if>
        <#-- NOTE: this still won't encode templates that are rendered to the writer -->
        <#t><#if .node["@encode"]! == "true">${sri.renderText(textLocation, textNode["@template"]!)?html}<#else>${sri.renderText(textLocation, textNode["@template"]!)}</#if>
        <#if sri.doBoundaryComments() && textNode["@no-boundary-comment"]! != "true"><!-- END   render-mode.text[@location=${textLocation}][@template=${textNode["@template"]!"true"}] --></#if>
    </#if>
    <#assign inlineTemplateSource = textNode.@@text!>
    <#if inlineTemplateSource?has_content>
        <#if sri.doBoundaryComments() && textNode["@no-boundary-comment"]! != "true"><!-- BEGIN render-mode.text[inline][@template=${textNode["@template"]!"true"}] --></#if>
        <#if !textNode["@template"]?has_content || textNode["@template"] == "true">
            <#assign inlineTemplate = [inlineTemplateSource, sri.getActiveScreenDef().location + ".render_mode.text"]?interpret>
            <@inlineTemplate/>
        <#else>
            <#if .node["@encode"]! == "true">${inlineTemplateSource?html}<#else>${inlineTemplateSource}</#if>
        </#if>
        <#if sri.doBoundaryComments() && textNode["@no-boundary-comment"]! != "true"><!-- END   render-mode.text[inline][@template=${textNode["@template"]!"true"}] --></#if>
    </#if>
</#macro>


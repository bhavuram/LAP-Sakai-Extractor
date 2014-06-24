<%--

    Copyright 2008 Sakaiproject Licensed under the
    Educational Community License, Version 2.0 (the "License"); you may
    not use this file except in compliance with the License. You may
    obtain a copy of the License at

    http://www.osedu.org/licenses/ECL-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an "AS IS"
    BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
    or implied. See the License for the specific language governing
    permissions and limitations under the License.

--%>
<%@ page contentType="text/html" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<jsp:directive.include file="/WEB-INF/jsp/header.jsp" />

<div class="portletBody">

<div class="alert alert-danger" style="display:none;">
    <a class="close" data-dismiss="alert">x</a>
    <span class="error-message"></span>
</div>
<div class="alert alert-success" style="display:none;">
    <a class="close" data-dismiss="alert">x</a>
    <span class="success-message"></span>
</div>

<h2><spring:message code="lap.title" /></h2>

<div class="instructions clear">
    <spring:message code="lap.instructions" />
</div>
<fieldset class="form-fieldset">
    <legend class="form-legend">Download a data report</legend>
    <form id="download-form" method="post" action="download.htm">
        <table class="table table-hover form-table">
            <tr>
                <td><label for="directory"><spring:message code="lap.label.select.directory" /></label></td>
                <td>
                    <select id="directory" name="directory" class="form-control">
                        <c:forEach var="directory" items="${directories}">
                            <option value="${directory.key}">${directory.value}</option>
                        </c:forEach>
                    </select>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="btn btn-primary csv" id="courses"><spring:message code="lap.button.courses" /></button>
                    <button class="btn btn-primary csv" id="grades"><spring:message code="lap.button.grades" /></button>
                    <button class="btn btn-primary csv" id="students"><spring:message code="lap.button.students" /></button>
                    <button class="btn btn-primary csv" id="usage"><spring:message code="lap.button.usage" /></button>
                </td>
            <tr>
        </table>
        <input type="hidden" id="action" name="action" value="" />
    </form>
</fieldset>
<fieldset class="form-fieldset">
    <legend class="form-legend">Generate a new set of data reports</legend>
    <form id="generate-form">
        <table class="table table-hover form-table">
            <tr>
                <td><label for="criteria"><spring:message code="lap.label.criteria" /></label></td>
                <td><input type="text" id="criteria" name="criteria" value="" placeholder="use '%' for a wildcard" /></td>
            </tr>
            <tr>
                <td><label for="startDate"><spring:message code="lap.label.start" /></label></td>
                <td><input type="text" id="startDate" name="startDate" class="datePicker" /></td>
            </tr>
            <tr>
                <td><label for="endDate"><spring:message code="lap.label.end" /></label></td>
                <td><input type="text" id="endDate" name="endDate" class="datePicker" /></td>
            </tr>
            <tr>
                <td colspan="2"><button class="btn btn-danger" id="generate"><spring:message code="lap.button.generate" /></button></td>
            </tr>
        </table>
    </form>
</fieldset>

</div>

<jsp:directive.include file="/WEB-INF/jsp/footer.jsp" />
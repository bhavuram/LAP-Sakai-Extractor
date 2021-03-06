/*
 * Copyright 2014 Sakaiproject Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 * http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// hack for MSIE browser look-up error
lapjQuery.browser={};
(function(){
    lapjQuery.browser.msie = false;
    lapjQuery.browser.version = 0;
    if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
        lapjQuery.browser.msie = true;
        lapjQuery.browser.version = RegExp.$1;
    }
})();

lapjQuery(document).ready(function() {
    // don't cache ajax calls
    $.ajaxSetup({
        cache: false
    });

    var url = "/direct/lap-sakai-extractor/";

    /**
     * Button click to download a file
     */
    lapjQuery(".buttons-extraction-download > td").on("click", "button", function() {
        lapjQuery("#action").val(this.id);
        lapjQuery("#form-download").submit();
    });

    /**
     * Button click to start a data extraction
     */
    lapjQuery(".button-extraction").on("click", "button", function() {
        var filterData = lapjQuery("#form-extraction").serialize();

        extractData(filterData, function(success, errorThrown) {
            var status = (success) ? "success" : "error";
            lapjQuery("#status-type").val(status);
            if (!success) {
                lapjQuery("#status-error-thrown").val(errorThrown);
            }

            lapjQuery("#form-extraction").submit();
        });
    });

    /**
     * POST request to run data extraction
     */
    function extractData(filterData, callback) {
        var request = lapjQuery.ajax({
            type: "POST",
            url:  url + "extraction",
            data: filterData,
            cache: false,
            async: false
        });

        request.success(function(data, status, jqXHR) {
            callback(true, "");
        });

        request.fail(function(jqXHR, textStatus, errorThrown) {
            callback(false, errorThrown);
        });
    }

    /**
     *  Date picker for activity date range on extraction
     */
    lapjQuery(function() {
        lapjQuery(".date-picker").datepicker({
            dateFormat: "yy-mm-dd",
            constrainInput: true,
            maxDate: "+0d",
            onClose: function() {
                checkDatePickerDates();
            }
        });
    });

    /**
     * Validates the dates selected in the date picker
     * Throws a warning if the end date is before the start date
     */
    function checkDatePickerDates() {
        lapjQuery(".button-extraction > button").show();
        lapjQuery(".date-picker-error").hide();

        var startDate = lapjQuery("#start-date").datepicker("getDate");
        var endDate = lapjQuery("#end-date").datepicker("getDate");

        if (startDate && endDate) {
            if (startDate > endDate) {
                lapjQuery(".button-extraction > button").hide();
                lapjQuery(".date-picker-error").show();
            }
        }
    }

    /**
     * GET request for the statistics from the server
     */
    lapjQuery.ajax({
        type: "GET",
        url:  url + "statistics",
        cache: false,
        async: false,
        success: (function(data, status, jqXHR) {
            lapjQuery.map(data.latestExtractionDate, function(date, i) {
                lapjQuery(".latest-extraction-date").html(date.displayDate);
            });
            lapjQuery(".next-extraction-date").html(data.nextExtractionDate);
            createExtractionListing(data.allExtractionDates);
            createDownloadButtons(data.availableFiles);
            toggleExtractionButtonDisplay(data.validFileSystem);
        }),
        fail: (function(jqXHR, textStatus, errorThrown) {})
    });

    /**
     * Creates the drop-down listing of extraction dates
     */
    function createExtractionListing(allExtractionDates) {
        var extractionsExist = false;
        lapjQuery.each(allExtractionDates, function(key, value) {
            lapjQuery("#extraction-date").append(lapjQuery("<option>", {value : key}).text(value.displayDate));
            extractionsExist = true;
        });

        // show the "no extractions" dialog if none exist
        if (!extractionsExist) {
            lapjQuery("#extraction-date").hide();
            lapjQuery(".buttons-extraction-download").hide();
            lapjQuery(".no-extractions-exist").show();
        }
    }

    /**
     * Creates the download button for each available file type
     */
    function createDownloadButtons(availableFiles) {
        lapjQuery.each(availableFiles, function(key, value) {
            lapjQuery(".buttons-extraction-download > td")
                .append(
                    lapjQuery("<button>",
                        {
                            id : key,
                            class : "btn btn-primary"
                        }
                    )
                    .text(key)
                );
        });
    }

    /**
     * Enables / disables extraction button
     */
    function toggleExtractionButtonDisplay(show) {
        if (show) {
            lapjQuery(".button-extraction > button").show();
        } else {
            lapjQuery(".button-extraction > button").hide();
        }
    }

});

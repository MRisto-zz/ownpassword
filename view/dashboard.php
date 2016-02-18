<div class="container-full">
	<div class="col-sm-3">
		<div class="folders-box">
			<h2>Ordner</h2>
			<ul id="folders"></ul>
			<span class="glyphicon glyphicon-plus" id="createFolder" aria-hidden="true"></span>
			<span class="glyphicon glyphicon-pencil" id="updateFolder" aria-hidden="true"></span>
		</div>
	</div>
	<div class="col-sm-9">
		<div class="passwords-box">
			<h2>Password</h2>
			<table class="table ">
				<thead>
					<tr>
						<th>Title</th>
						<th>Username</th>
						<th>Password</th>
						<th></th>

					</tr>
				</thead>
				<tbody id="password-content"></tbody>
			</table>
			<span class="glyphicon glyphicon-plus" id="createPassword" aria-hidden="true"></span>
		</div>
	</div>

</div>

<!-- Modal  For Editing the Password-->
<div class="modal fade" id="passwordEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Passwort bearbeiten</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label">Titel:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="passwordEdit-title">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">Username:</label>
						<div class="col-sm-10">
							<input class="form-control" id="passwordEdit-username">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">Passwort:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="passwordEdit-password">
						</div>
					</div>
					<input type="hidden" value="" id="passwordEdit-token">

				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Close
				</button>
				<button type="button" class="btn btn-danger btn-passwordEdit-delete">
					Delete
				</button>
				<button type="button" class="btn btn-primary btn-passwordEdit-save">
					Save changes
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal  For Editing the Folder-->
<div class="modal fade" id="folderEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Ordner bearbeiten</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label">Titel:</label>
						<div class="col-sm-10">
							<input class="form-control" type="text" id="folderEdit-title">
						</div>
					</div>
					<input type="hidden" value="" id="folderEdit-token">

				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Close
				</button>
				<button type="button" class="btn btn-danger btn-folderEdit-delete">
					Delete
				</button>
				<button type="button" class="btn btn-primary btn-folderEdit-save">
					Save changes
				</button>
			</div>
		</div>
	</div>
</div>